interface INote {
  id: string;
  title: string;
  content: string;
  tags: ITag[];
}

interface ITag {
  id: string;
  tag: string;
}

type noteInitialState = {
  notes: INote[];
};

type searchInitialState = {
  tags: ITag[];
};
