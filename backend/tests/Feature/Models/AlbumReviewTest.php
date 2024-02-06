<?php

namespace Tests\Feature\Models;

use App\Models\AlbumReview;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AlbumReviewTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_be_created()
    {
        $albumReview = AlbumReview::factory()->create();

        $this->assertDatabaseHas('album_reviews', [
            'id' => $albumReview->id,
        ]);
    }

    public function test_can_be_updated()
    {
        $albumReview = AlbumReview::factory()->create();

        $albumReview->update([
            'rating' => 50,
            'body' => 'New Review. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        ]);

        $this->assertDatabaseHas('album_reviews', [
            'id' => $albumReview->id,
            'rating' => 50,
            'body' => 'New Review. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        ]);
    }

    public function test_can_be_deleted()
    {
        $albumReview = AlbumReview::factory()->create();

        $albumReview->delete();

        $this->assertDatabaseMissing('album_reviews', [
            'id' => $albumReview->id,
        ]);
    }
}
