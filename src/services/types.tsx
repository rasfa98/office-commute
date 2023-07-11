export namespace API {
  export type GenerateAccessTokenResponse = {
    access_token: string;
    scope: string;
    token_type: string;
    expires_in: number;
  };

  export type AccessToken = {
    token: string;
    expires: Date;
  };

  export type Line = {
    gid: string;
    name: string;
    shortName: string;
    designation: string;
    backgroundColor: string;
    foregroundColor: string;
    borderColor: string;
    transportMode: string;
    transportSubMode: string;
    isWheelchairAccessible: boolean;
  };

  export type ServiceJourney = {
    gid: string;
    direction: string;
    line: Line;
  };

  export type StopPoint = {
    gid: string;
    name: string;
    platform: string;
    latitude: number;
    longitude: number;
  };

  export type Pagination = {
    limit: number;
    offset: number;
    size: number;
  };

  export type Links = {
    current: string;
  };

  export type Departure = {
    detailsReference: string;
    serviceJourney: ServiceJourney;
    stopPoint: StopPoint;
    plannedTime: string;
    estimatedTime: string;
    estimatedOtherwisePlannedTime: string;
    isCancelled: boolean;
    isPartCancelled: boolean;
  };

  export type DeparturesResponse = {
    results: Departure[];
    pagination: Pagination;
    links: Links;
  };
}
