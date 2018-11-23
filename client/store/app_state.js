import {
  observable,
  computed,
  autorun,
  action,
} from 'mobx';

export default class AppState {
  constructor({ name, count } = { name: 'Joke', count: 0 }) {
    this.name = name;
    this.count = count;
  }

  @observable count;

  @observable name;

  @computed get msg() {
    return `name:${this.name}--count:${this.count}`;
  }

  @action changeName(name) {
    this.name = name;
  }

  @action changeCount(num) {
    this.count = num;
  }

  @action add() {
    this.count += 1;
  }

  toJson() {
    return {
      name: this.name,
      count: this.count,
    }
  }
}


// autorun(() => {
//   console.log(detailStore.msg);
// });

// setInterval(() => {
//   detailStore.add();
// }, 1000)
