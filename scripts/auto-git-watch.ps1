# =============================================================
# Auto Git Commit & Push Watcher
# Watches the project for file changes and auto-commits + pushes
# Usage: .\scripts\auto-git-watch.ps1
# =============================================================

param(
    [string]$ProjectPath = (Split-Path -Parent $PSScriptRoot),
    [int]$DebounceSeconds = 5
)

Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "   Auto Git Commit & Push Watcher" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "  Watching: $ProjectPath" -ForegroundColor Yellow
Write-Host "  Remote:   origin/main" -ForegroundColor Yellow
Write-Host "  Debounce: ${DebounceSeconds}s after last change" -ForegroundColor Yellow
Write-Host "  Press Ctrl+C to stop." -ForegroundColor Gray
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

# Folders/patterns to IGNORE
$excludedDirs = @("node_modules", ".git", "dist", ".next", "build", "scratch")

# Set up FileSystemWatcher
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $ProjectPath
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true
$watcher.NotifyFilter = [System.IO.NotifyFilters]::LastWrite -bor
                        [System.IO.NotifyFilters]::FileName -bor
                        [System.IO.NotifyFilters]::DirectoryName

# Shared state
$script:pendingCommit = $false
$script:lastChangeTime = [datetime]::MinValue
$script:changedFiles = [System.Collections.Generic.HashSet[string]]::new()

function Should-Ignore($path) {
    foreach ($dir in $excludedDirs) {
        if ($path -like "*\$dir\*" -or $path -like "*\$dir") {
            return $true
        }
    }
    return $false
}

function Handle-Change($path) {
    if (Should-Ignore $path) { return }
    $rel = $path.Replace($ProjectPath, "").TrimStart("\")
    $script:changedFiles.Add($rel) | Out-Null
    $script:lastChangeTime = [datetime]::UtcNow
    $script:pendingCommit = $true
}

# Register event handlers
$onChange = Register-ObjectEvent $watcher Changed  -Action { Handle-Change $Event.SourceEventArgs.FullPath }
$onCreate = Register-ObjectEvent $watcher Created  -Action { Handle-Change $Event.SourceEventArgs.FullPath }
$onDelete = Register-ObjectEvent $watcher Deleted  -Action { Handle-Change $Event.SourceEventArgs.FullPath }
$onRename = Register-ObjectEvent $watcher Renamed  -Action {
    Handle-Change $Event.SourceEventArgs.OldFullPath
    Handle-Change $Event.SourceEventArgs.FullPath
}

try {
    while ($true) {
        Start-Sleep -Milliseconds 500

        if ($script:pendingCommit) {
            $elapsed = ([datetime]::UtcNow - $script:lastChangeTime).TotalSeconds
            if ($elapsed -ge $DebounceSeconds) {
                $script:pendingCommit = $false
                $files = $script:changedFiles | Sort-Object
                $script:changedFiles.Clear()

                # Build commit message
                $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
                $fileList  = ($files | Select-Object -First 5) -join ", "
                if ($files.Count -gt 5) { $fileList += " (+$($files.Count - 5) more)" }
                $commitMsg = "auto: $timestamp | $fileList"

                Write-Host ""
                Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Changes detected:" -ForegroundColor Green
                $files | ForEach-Object { Write-Host "  - $_" -ForegroundColor Gray }

                # Stage all
                Write-Host "  Staging..." -ForegroundColor DarkCyan
                & git -C $ProjectPath add -A 2>&1 | Out-Null

                # Check if there is actually something to commit
                $status = & git -C $ProjectPath status --porcelain
                if (-not $status) {
                    Write-Host "  Nothing to commit (already clean)." -ForegroundColor DarkGray
                    continue
                }

                # Commit
                Write-Host "  Committing: $commitMsg" -ForegroundColor DarkCyan
                $commitResult = & git -C $ProjectPath commit -m $commitMsg 2>&1
                if ($LASTEXITCODE -ne 0) {
                    Write-Host "  [ERROR] Commit failed: $commitResult" -ForegroundColor Red
                    continue
                }

                # Push
                Write-Host "  Pushing to origin/main..." -ForegroundColor DarkCyan
                $pushResult = & git -C $ProjectPath push origin main 2>&1
                if ($LASTEXITCODE -ne 0) {
                    Write-Host "  [ERROR] Push failed: $pushResult" -ForegroundColor Red
                    Write-Host "  (Changes are committed locally)" -ForegroundColor Yellow
                } else {
                    Write-Host "  [OK] Committed & pushed successfully!" -ForegroundColor Green
                }
            }
        }
    }
} finally {
    # Cleanup event handlers on Ctrl+C
    Unregister-Event -SourceIdentifier $onChange.Name -ErrorAction SilentlyContinue
    Unregister-Event -SourceIdentifier $onCreate.Name -ErrorAction SilentlyContinue
    Unregister-Event -SourceIdentifier $onDelete.Name -ErrorAction SilentlyContinue
    Unregister-Event -SourceIdentifier $onRename.Name -ErrorAction SilentlyContinue
    $watcher.Dispose()
    Write-Host ""
    Write-Host "Watcher stopped." -ForegroundColor Yellow
}
