'use client';

import { usePathname } from "next/navigation";
import CpeLayout from "./cpeLayout";

const getBackButtonTitle = (pathname: string): string => {
  // For dynamic routes like /messages/[id], show the parent section
  if (pathname.match(/\/messages\/\w+/)) return 'Messages';
  
  // For main control panel sections, show "Control Panel"
  if (pathname.includes('/account') || 
      pathname.includes('/messages') || 
      pathname.includes('/equipment') || 
      pathname.includes('/settings')) {
    return 'Control Panel';
  }
  
  return 'Control Panel';
};

interface ControlPanelWrapperProps {
  children: React.ReactNode;
}

export default function ControlPanelWrapper({ children }: ControlPanelWrapperProps) {
  const pathname = usePathname();
  const title = getBackButtonTitle(pathname);
  
  return <CpeLayout title={title}>{children}</CpeLayout>;
}