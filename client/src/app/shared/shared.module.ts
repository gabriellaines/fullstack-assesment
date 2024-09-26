import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElapsedTimePipe } from './pipes/elapsed-time.pipe';

@NgModule({
  declarations: [ElapsedTimePipe],
  imports: [CommonModule],
  exports: [ElapsedTimePipe]
})
export class SharedModule {}