import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LikeService } from './like.service';

describe('LikeService', () => {
    let likeService: LikeService;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                LikeService
            ]
        });

        likeService = TestBed.inject(LikeService);
    });

    it('should be created', () => {
        const likeService: LikeService = TestBed.inject(LikeService);
        expect(likeService).toBeTruthy();
    });
});