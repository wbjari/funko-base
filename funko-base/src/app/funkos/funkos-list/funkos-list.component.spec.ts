import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FunkosListComponent } from './funkos-list.component';

describe('FunkosListComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientModule
            ],
            declarations: [
                FunkosListComponent
            ],
        }).compileComponents();
    });

    it('should create the funkos-list.component', () => {
        const fixture = TestBed.createComponent(FunkosListComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
