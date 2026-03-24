declare module 'google-trends-api' {
  interface InterestOverTimeOptions {
    keyword: string[];
    geo?: string;
    hl?: string;
    startTime?: Date;
    endTime?: Date;
  }
  function interestOverTime(options: InterestOverTimeOptions): Promise<string>;
  export = { interestOverTime };
}
