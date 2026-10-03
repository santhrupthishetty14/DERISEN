import urllib.request
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

url = 'https://www.pinterest.com/pin/757167756146789888/'
req = urllib.request.Request(url, headers=headers)
html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

mp4s = set(re.findall(r'https://[^\"\'\s\\]+?\.mp4', html))
print('Direct MP4s:', mp4s)

scripts = re.findall(r'<script[^>]*>(.*?)</script>', html, re.DOTALL)
for s in scripts:
    if 'video' in s.lower() and 'url' in s.lower():
        found = re.findall(r'https://[^\"\'\s\\]+?(?:\.mp4|\.m3u8)', s)
        if found:
            print('Found in script:', found)
