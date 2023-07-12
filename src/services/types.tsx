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
          platform: string;
        };
      };
      serviceJourney: {
        direction: string;
        line: Line;
      };
    }[];
  };

  export type JourneysResponse = {
    results: Journey[];
  };
}
