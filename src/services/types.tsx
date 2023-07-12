export namespace API {
  export type GenerateAccessTokenResponse = {
    access_token: string;
    expires_in: number;
  };

  export type AccessToken = {
    token: string;
    expires: Date;
  };

  export type Line = {
    backgroundColor: string;
    borderColor: string;
    foregroundColor: string;
    designation: string;
  };

  export type Journey = {
    detailsReference: string;
    tripLegs: {
      isCancelled: boolean;
      estimatedOtherwisePlannedDepartureTime: string;
      origin: {
        stopPoint: {
          name: string;
          platform: string;
        };
      };
      serviceJourney: {
        line: Line;
      };
    }[];
  };

  export type Position = {
    latitude: number;
    longitude: number;
  };

  export type JourneysResponse = {
    results: Journey[];
  };
}
