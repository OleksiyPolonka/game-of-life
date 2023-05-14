export enum CELL_STATE {
  ALIVE,
  DEAD,
}

export type CellProps = {
  state: CELL_STATE;
  intermediateState: CELL_STATE;
};
