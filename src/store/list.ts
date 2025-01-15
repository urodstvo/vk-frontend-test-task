import { RepositoryCardProps } from '@/components/repository-card';
import { makeAutoObservable } from 'mobx';

export class ResultListStore {
  edited: RepositoryCardProps[] = [];
  deletedIds: Set<number> = new Set();

  constructor() {
    makeAutoObservable(this);
  }

  delete(id: number) {
    this.deletedIds.add(id);
  }

  edit(newItem: RepositoryCardProps) {
    this.edited.push(newItem);
  }
}

export const resultListStore = new ResultListStore();
