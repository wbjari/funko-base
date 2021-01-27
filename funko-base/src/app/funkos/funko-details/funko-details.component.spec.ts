import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Funko } from 'src/app/models/funko.model';
import { FunkoDetailsComponent } from './funko-details.component';

describe('FunkoDetailsComponent', () => {

    let funkoDetailsComponent: FunkoDetailsComponent;
    let fixture: ComponentFixture<FunkoDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientModule
            ]
        }).compileComponents();

        // refine the test module by declaring the test component
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule],
            declarations: [FunkoDetailsComponent]
        });

        // create component and test fixture
        fixture = TestBed.createComponent(FunkoDetailsComponent);

        // get test component from the fixture
        funkoDetailsComponent = fixture.componentInstance;
        funkoDetailsComponent.ngOnInit();
    });

    it('should be invalid when form is empty', () => {
        expect(funkoDetailsComponent.updateFunkoForm.valid).toBeFalsy();
    });

    it('should check name validators', () => {
        let errors: any = {};
        let name = funkoDetailsComponent.updateFunkoForm.controls['name'];
        expect(name.valid).toEqual(false);
        
        // Name field is required.
        errors = name.errors || {};
        expect(name.hasError('required')).toEqual(true);

        // Set name to something with less than 4 characters.
        name.setValue("hoi");
        errors = name.errors || {};
        expect(name.hasError('required')).toEqual(false);
        expect(name.hasError('minlength')).toEqual(true);

        // Set name to something with more than 4 characters.
        name.setValue("Batman");
        errors = name.errors || {};
        expect(name.hasError('required')).toEqual(false);
        expect(name.hasError('minlength')).toEqual(false);
    });

    it('should check number validators', () => {
        let errors: any = {};
        let number = funkoDetailsComponent.updateFunkoForm.controls['number'];
        expect(number.valid).toEqual(false);

        // Number field is required.
        errors = number.errors || {};
        expect(number.hasError('required')).toEqual(true);

        // Set number to something lower than 1.
        number.setValue(0);
        errors = number.errors || {};
        expect(number.hasError('required')).toEqual(false);
        expect(number.hasError('min')).toEqual(true);

        // Set number to something higher than 1.
        number.setValue(365);
        errors = number.errors || {};
        expect(number.hasError('required')).toEqual(false);
        expect(number.hasError('min')).toEqual(false);
    });

    it('should check serie validators', () => {
        let errors: any = {};
        let serie = funkoDetailsComponent.updateFunkoForm.controls['serie'];
        expect(serie.valid).toEqual(false);

        // Serie field is required.
        errors = serie.errors || {};
        expect(serie.hasError('required')).toEqual(true);

        // Set serie to something.
        serie.setValue(1);
        errors = serie.errors || {};
        expect(serie.hasError('required')).toEqual(false);
    });
    
});
