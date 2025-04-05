import { useState, useEffect } from 'react';

interface NavigatorConnection {
    effectiveType: 'slow-2g' | '2g' | '3g' | '4g' | 'wifi';
    downlinkMax: number;
    rtt: number;
    saveData: boolean;
  }
  
  interface Navigator {
    connection: NavigatorConnection;
  }
  
// Utility function to ping your own server
const pingServer = async (): Promise<boolean> => {
  try {
    // Ping the root endpoint ("/")
    const response = await fetch('/', { method: 'HEAD', cache: 'no-store' });

    // If the response is OK, return true indicating that the server is reachable
    return response.ok;
  } catch (error) {
    // If the ping fails (e.g., server is unreachable), return false indicating offline
    return false;
  }
};

// Utility function to check Network Information API (if supported)
const getConnectionType = (): string | null => {
    if ('connection' in navigator && navigator.connection !== null) {
        // Narrow the type to `NavigatorConnection` to safely access `effectiveType`
        const connection = navigator.connection as NavigatorConnection;
        return connection.effectiveType; // 'effectiveType' should now be valid
      }
  return null; // If unsupported, return null
};

interface ConnectivityStatus {
  isOffline: boolean;
  connectionType: string | null;
}

const useConnectivityStatus = (): ConnectivityStatus => {
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [connectionType, setConnectionType] = useState<string | null>(null);

  // Function to check the app's current connectivity status
  let intervalId = 0;
  const checkConnectivity = async (): Promise<void> => {
    // First, check navigator.onLine
    if(intervalId)clearInterval(intervalId);
    intervalId = setInterval(async() => {
      const isConnected = await pingServer();
      console.log(isConnected)
      if (isConnected) {
        setIsOffline(false);
      } else {
        setIsOffline(true);
      }
    }, 30000);
    // Attempt to ping the server to check connectivity
    
  };

  useEffect(() => {
    // Set the initial state by checking connectivity
    checkConnectivity();

    // If Network Information API is supported, update the connection type
    const type = getConnectionType();
    if (type) setConnectionType(type);

    // Event listeners for online/offline events
    const handleOnline = (): void => {

      checkConnectivity(); // Recheck when the network status changes
    };

    window.addEventListener('offline', handleOnline);
    window.addEventListener('online', handleOnline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('offline', handleOnline);
      window.removeEventListener('online', handleOnline);
      clearInterval(intervalId); // Clear the interval to avoid memory leaks

    };
  }, []);
console.log({isOffline})
  return { isOffline, connectionType };
};

export default useConnectivityStatus;
