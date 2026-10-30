import { DatePipe } from '@angular/common';
import { Component, effect, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlogStore } from './blog.store';
import { Post } from './models';

@Component({
  selector: 'app-comments',
  imports: [DatePipe, FormsModule],
  templateUrl: './comments.html',
})
export class Comments {
  readonly post = input.required<Post>();
  readonly store = inject(BlogStore);
  readonly notice = signal('');
  author = '';
  text = '';

  constructor() {
    effect(() => {
      this.post();
      this.author = '';
      this.text = '';
      this.notice.set('');
    });
  }

  submit(): void {
    const author = this.author.trim();
    const text = this.text.trim();

    if (!author || !text) {
      this.notice.set('請填寫暱稱與留言內容。');
      return;
    }

    const saved = this.store.addComment(this.post(), author, text);
    this.text = '';
    this.notice.set(
      saved
        ? '留言已儲存於這個瀏覽器。'
        : '留言已顯示，但瀏覽器無法保存資料，重新整理後將不會保留。',
    );
  }
}
