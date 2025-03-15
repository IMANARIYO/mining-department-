export interface Warning {
  status: boolean;
  message: string;
}

export interface ManpowerItem {
  id: string;
  warning: Warning;
  name: string;
  role: string;
  location: string;
  present: boolean;
}
