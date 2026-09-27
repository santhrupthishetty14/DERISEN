import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallbackPageName?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-[#180128] text-white">
          <div className="max-w-md p-8 rounded-3xl bg-[#24033b] border border-purple-500/30 shadow-2xl">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-900/60 border border-purple-400/40 flex items-center justify-center text-purple-300 font-bold">
              !
            </div>
            <h2 className="text-xl font-bold mb-2">Unable to load {this.props.fallbackPageName || 'content'}</h2>
            <p className="text-sm text-purple-200/70 mb-6">
              We encountered a temporary rendering issue. Please click below to refresh the page.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                if (this.props.onReset) {
                  this.props.onReset();
                } else {
                  window.location.reload();
                }
              }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#6320EE] to-[#7C3AED] text-white font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
