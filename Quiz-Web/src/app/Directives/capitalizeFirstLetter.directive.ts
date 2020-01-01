import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'capitalizeFirst'
})

//this pipe for only capitalize the first letter of a string(long sentence)
//Angular titlecase pipe will capitalize each word in a sentence
export class CapitalizeFirstPipe implements PipeTransform {
	transform(value: string): string {
		if (!value) return null;
		return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
	}
}
