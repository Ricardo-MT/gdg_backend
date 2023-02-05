import { ITalk } from 'interfaces/ITalkProposal';

export interface IEdition {
  _id: string;
  organizer: string;
  date: number;
  location: string;
  title: string;
  description: string;
  registrationLink?: string;
  talks: Array<ITalk>;
}
