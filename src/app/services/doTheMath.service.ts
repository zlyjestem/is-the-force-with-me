import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { MathInput } from '../models/mathInput.model';
//import { Response, Headers, RequestOptions } from '@angular/http';
//import'rxjs/Rx';
//import {Observable} from 'rxjs/Observable';

@Injectable()
export class DoTheMath {
    winDistribution = [];
    result = [];
    previousResult = [];
    constructor(private http: Http){
    }

    
    calaculateWinDistrubution(mathInput: MathInput){
        this.winDistribution = [];
        this.result = [];
        this.winDistribution[0] = mathInput.NumberOfPlayers;
        for(var i = 1; i <= mathInput.NumberOfRounds; i++){
            var tempScoreFirstRound = this.winDistribution[i-1]/2;
            this.winDistribution[i] = tempScoreFirstRound;
            this.winDistribution[i-1] = tempScoreFirstRound;
            if (i >= 2){
                for (var k = i-2; k>=0; k--){
                    var tempScoreFollowingRounds = this.winDistribution[k]/2;
                    this.winDistribution[k+1] = this.winDistribution[k+1]+tempScoreFollowingRounds;
                    this.winDistribution[k] = this.winDistribution[k]-tempScoreFollowingRounds;
                }
            }
        }
        for (var l=0; l < this.winDistribution.length; l++){
            this.result.push(0);
        }
        for (var j = this.result.length-1; j>=0; j--){
            if (mathInput.SizeOfTop >= 0){
                this.result[j] = mathInput.SizeOfTop/this.winDistribution[j];
                if (this.result[j] >= 1){
                    this.result[j] = 100;
                } else {
                    this.result[j] = this.result[j] * 100;
                }
                mathInput.SizeOfTop = mathInput.SizeOfTop - this.winDistribution[j];    
            }
        }
        return this.result;
    }
}