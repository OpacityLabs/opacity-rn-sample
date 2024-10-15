interface Resource {
  id: string;
  alias: string;
  name: string;
  description: string;
  minSDKVersion: string;
  retrieves: string[];
  enabled: boolean;
}

interface Platform {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  resources: Resource[];
}

type Platforms = Platform[];
