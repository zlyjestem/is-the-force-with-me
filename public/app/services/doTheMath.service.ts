import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { MathInput } from '../models/mathInput.model';
import { WinNumber } from '../models/winNumber.Model';
//import { Response, Headers, RequestOptions } from '@angular/http';
//import'rxjs/Rx';
//import {Observable} from 'rxjs/Observable';

@Injectable()
export class DoTheMath {
    constructor(private http: Http){
    }

    
    calaculateWinDistrubution(mathInput: MathInput){
        var winDistribution = [];
        var result = [];
        winDistribution[0] = mathInput.NumberOfPlayers;
        for(var i = 1; i <= mathInput.NumberOfRounds; i++){
            var tempScoreFirstRound = winDistribution[i-1]/2;
            winDistribution[i] = tempScoreFirstRound;
            winDistribution[i-1] = tempScoreFirstRound;
            if (i >= 2){
                for (var k = i-2; k>=0; k--){
                    var tempScoreFollowingRounds = winDistribution[k]/2;
                    winDistribution[k+1] = winDistribution[k+1]+tempScoreFollowingRounds;
                    winDistribution[k] = winDistribution[k]-tempScoreFollowingRounds;
                }
            }
        }
        for (var l=0; l < winDistribution.length; l++){
            result.push(0);
        }
        for (var j = result.length-1; j>=0; j--){
            if (mathInput.SizeOfTop >= 0){
                result[j] = mathInput.SizeOfTop/winDistribution[j];
                if (result[j] >= 1){
                    result[j] = 100;
                } else {
                    result[j] = result[j] * 100;
                }
                mathInput.SizeOfTop = mathInput.SizeOfTop - winDistribution[j];    
            }
        }
        return result;
    }

    formatResult(rawResult: Array<Number>){
        var formatedResult = [];
        for(var i=0; i<rawResult.length; i++){
            var tempWin = new WinNumber(null, null, null);
            tempWin.NumberOfWins = i;
            tempWin.Probability = rawResult[i];
            if(rawResult[i]>=100){
                tempWin.Display='progress-bar-success';
            } else if(rawResult[i] <=0) {
                tempWin.Display = 'progress-bar-danger';
            } else {
                tempWin.Display = 'progress-bar-warning';
            }
            formatedResult.push(tempWin);
        }
        return formatedResult.reverse();
    }
}