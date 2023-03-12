export interface ITalkProposal {
  _id: string;
  createdBy: string;
  speakersIds: Array<string>;
  title: string;
  description: string;
  skills: Array<string>;
  notes: string;
}

export interface ITalk {
  _id: string;
  createdBy: string;
  speakersIds: Array<string>;
  title: string;
  description: string;
  skills: Array<string>;
}
