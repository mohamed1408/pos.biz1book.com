import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
// import { Document } from './urban-piper/document';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  currentDocument = this.socket.fromEvent<Document>('document');
  documents = this.socket.fromEvent<string[]>('documents');
  orders = this.socket.fromEvent<object[]>('Orders');
  constructor(private socket: Socket) { }

  getDocument(id: string) {
    this.socket.emit('getDoc', id);
  }

  newDocument() {
    this.socket.emit('addDoc', { id: this.docId(), doc: '' });
  }

  editDocument(document: any) {
    this.socket.emit('editDoc', document);
  }

  private docId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}
