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


    compactResult(rawResult: Array<Number>){
        var compactedResult = [];
        for(var i=1; i<=rawResult.length; i++){
            if (rawResult[i-1] < rawResult[i]){
                if (rawResult[i-1] <=0) {
                    var tempWinNone = new WinNumber(null, null, null, null, null, false);
                    tempWinNone.NumberOfWins = i-1;
                    tempWinNone.Probability = rawResult[i-1];
                    tempWinNone.Header = 'I sense hangar bay in you.';
                    tempWinNone.Display = 'progress-bar-danger';
                    tempWinNone.Label = 'With '+ (i-1) + ' wins or less you have ' + rawResult[i-1] + '% to reach top';
                    compactedResult.push(tempWinNone);
                }

                var tempWin = new WinNumber(null, null, null, null, null, false);
                tempWin.NumberOfWins = i;
                tempWin.Probability = rawResult[i];
                if(rawResult[i]>=100){
                    tempWin.Header='Good... Good...';
                    tempWin.Display='progress-bar-success';
                    tempWin.Label = 'With '+ (i) + ' wins or more you have ' + rawResult[i] + '% to reach top';
                } else {
                    tempWin.Header = 'Do or do not. There is no try.';
                    tempWin.Display = 'progress-bar-warning';
                    tempWin.CombinedProgress = true;
                    tempWin.Label = 'With '+ (i) + ' wins you have ' + rawResult[i] + '% to reach top';
                }
                
                compactedResult.push(tempWin);
            } 
        }

        if (compactedResult.length == 0){
            {
                var tempWin = new WinNumber(null, null, null, null, null, false);
                tempWin.NumberOfWins = 0;
                tempWin.Probability = rawResult[0];
                if(rawResult[0]>=100){
                    tempWin.Header='Good... Good...';
                    tempWin.Display='progress-bar-success';
                    tempWin.Label = 'With 0 or more wins you have ' + rawResult[0] + '% to reach top';
                } else if(rawResult[0] <=0) {
                    tempWin.Header = 'I sense hangar bay in you.';
                    tempWin.Display = 'progress-bar-danger';
                    tempWin.Label = 'With 0 wins you have ' + rawResult[0] + '% to reach top';
                } else {
                    tempWin.Header = 'Do or do not. There is no try.';
                    tempWin.Display = 'progress-bar-warning';
                    tempWin.Label = 'With 0 or more wins you have ' + rawResult[0] + '% to reach top';
                }
                compactedResult.push(tempWin);
            }
        }
        return compactedResult.reverse();
    }
}