import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'feedbackApp';

  activeScreen: number = 0;
  progress: number = 0;
  progressBar: any = '0%'
  userCount: any = 1;
  text_answer: any;

  rating_result: any = {
    1: '',
    2: '',
    3: '',
    4: '',
    5: ''
  }
  

  ngOnInit(): void {
    
  }

  counter(i: number) {
    return new Array(i);
  }

  prevPage(){
    this.activeScreen = this.activeScreen - 1;
    if(this.activeScreen <= 5 && this.activeScreen >= 0){
      this.progress = this.progress - 20;
      this.progressBar = this.progress + '%';
    }
    setTimeout(() => {
      this.selectRating(this.activeScreen, this.rating_result[this.activeScreen]);
    }, 50);
  }

  nextPage(){
    ++this.activeScreen;
    if(this.activeScreen >= 2){
      this.progress = this.progress + 20;
      this.progressBar = this.progress + '%';
    }
  }

  submit(){
    if(confirm('Are you sure want to submit?')){
      this.progress = this.progress + 20;
      this.progressBar = this.progress + '%';

      let res_array = [];
      if(this.userCount > 1){
        let result = JSON.parse(localStorage.getItem('rating_result') || '');
        res_array = result;
      }
      this.rating_result[5] = this.text_answer;
      res_array.push(this.rating_result);
      localStorage.setItem('rating_result', JSON.stringify(res_array));
      this.activeScreen = 6;
      setTimeout(() => {
        this.activeScreen = 0;
        this.progress = 0;
        this.progressBar = '0%';
        this.text_answer = '';
        ++this.userCount;
      }, 5000);
    }
  }

  selectRating(question:any, val:any){
    let rating = document.getElementsByClassName(`ques_${question}`) as any;
    for(let i=0; i<rating.length; i++){
      rating[i].classList.remove('active');
    }
    
    for(let i=0; i<val; i++){
      rating[i].classList.add('active');
    }

    this.rating_result[question] = val;
  }
}
