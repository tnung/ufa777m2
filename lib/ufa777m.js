'use babel';

import Ufa777mView from './ufa777m-view';
import { CompositeDisposable } from 'atom';

export default {

  ufa777mView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.ufa777mView = new Ufa777mView(state.ufa777mViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.ufa777mView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ufa777m:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ufa777mView.destroy();
  },

  serialize() {
    return {
      ufa777mViewState: this.ufa777mView.serialize()
    };
  },

  toggle() {
    console.log('Ufa777m was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
