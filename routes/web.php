<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ====================
// UI PREVIEW ROUTES (no auth needed, no database needed - just for viewing the design)
// ====================
Route::prefix('ui')->group(function () {
    Route::get('/admin/dashboard', function () {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalPractitioners' => 12,
                'activeUsers' => 5,
                'entriesToday' => 8,
                'totalEntries' => 143,
            ],
            'recentPractitioners' => [
                ['id' => 1, 'name' => 'Maya Devi', 'code' => 'KD-2026-A72', 'status' => 'active'],
                ['id' => 2, 'name' => 'Arjun Patel', 'code' => 'KD-2026-B34', 'status' => 'active'],
                ['id' => 3, 'name' => 'Priya Sharma', 'code' => 'KD-2026-C91', 'status' => 'inactive'],
                ['id' => 4, 'name' => 'Ananda Krishnan', 'code' => 'KD-2026-D45', 'status' => 'active'],
            ],
            'recentEntries' => [
                ['id' => 1, 'title' => 'The First Spark', 'author' => 'Maya Devi', 'day' => 1, 'date' => '2026-03-15'],
                ['id' => 2, 'title' => 'Rooted in Being', 'author' => 'Maya Devi', 'day' => 7, 'date' => '2026-03-21'],
                ['id' => 3, 'title' => 'The Waters of Creativity', 'author' => 'Arjun Patel', 'day' => 21, 'date' => '2026-04-04'],
            ],
        ]);
    });

    Route::get('/admin/practitioners', function () {
        return Inertia::render('Admin/Practitioners', [
            'practitioners' => [
                ['id' => 1, 'name' => 'Maya Devi', 'email' => 'maya@example.com', 'code' => 'KD-2026-A72', 'entries_count' => 45, 'status' => 'active', 'last_active' => '2 hours ago'],
                ['id' => 2, 'name' => 'Arjun Patel', 'email' => 'arjun@example.com', 'code' => 'KD-2026-B34', 'entries_count' => 32, 'status' => 'active', 'last_active' => '1 day ago'],
                ['id' => 3, 'name' => 'Priya Sharma', 'email' => 'priya@example.com', 'code' => 'KD-2026-C91', 'entries_count' => 18, 'status' => 'inactive', 'last_active' => '2 weeks ago'],
                ['id' => 4, 'name' => 'Ananda Krishnan', 'email' => 'ananda@example.com', 'code' => 'KD-2026-D45', 'entries_count' => 27, 'status' => 'active', 'last_active' => '5 hours ago'],
                ['id' => 5, 'name' => 'Devi Lakshmi', 'email' => null, 'code' => 'KD-2026-E78', 'entries_count' => 5, 'status' => 'active', 'last_active' => '3 days ago'],
                ['id' => 6, 'name' => 'Shiva Nataraj', 'email' => 'shiva@example.com', 'code' => 'KD-2026-F12', 'entries_count' => 16, 'status' => 'inactive', 'last_active' => '1 month ago'],
            ],
        ]);
    });

    Route::get('/admin/practitioners/create', function () {
        return Inertia::render('Admin/CreatePractitioner');
    });

    Route::get('/admin/broadcast', function () {
        return Inertia::render('Admin/BroadcastNotice');
    });

    Route::get('/admin/quotes', function () {
        return Inertia::render('Admin/Quotes');
    });

    Route::get('/admin/qr-codes', function () {
        return Inertia::render('Admin/QrCodes');
    });

    Route::get('/admin/events', function () {
        return Inertia::render('Admin/Events');
    });

    Route::get('/admin/meditations', function () {
        return Inertia::render('Admin/Meditations');
    });

    Route::get('/admin/knowledge', function () {
        return Inertia::render('Admin/Knowledge');
    });

    Route::get('/admin/testimonials', function () {
        return Inertia::render('Admin/Testimonials', [
            'testimonials' => [],
            'availableEntries' => [],
        ]);
    });

    Route::get('/admin/donation', function () {
        return Inertia::render('Admin/Donation');
    });

    Route::get('/admin/about-content', function () {
        return Inertia::render('Admin/AboutContent');
    });

    Route::get('/donate', function () {
        return Inertia::render('Donate');
    });

    // Public site previews
    Route::get('/golden-rules', function () {
        return Inertia::render('GoldenRules');
    });

    Route::get('/about', function () {
        return Inertia::render('About');
    });

    Route::get('/about/grand-master', function () {
        return Inertia::render('AboutGrandMaster');
    });

    Route::get('/about/core-team', function () {
        return Inertia::render('CoreTeam');
    });

    Route::get('/meditation', function () {
        return Inertia::render('Meditation');
    });

    Route::get('/knowledge', function () {
        return Inertia::render('Knowledge');
    });

    Route::get('/events', function () {
        return Inertia::render('Events');
    });

    Route::get('/blog', function () {
        return Inertia::render('Blog');
    });

    Route::get('/contact', function () {
        return Inertia::render('Contact');
    });

    Route::get('/login', function () {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => false,
            'status' => null,
        ]);
    });

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    });

    Route::get('/journal/create', function () {
        return Inertia::render('Journal/Create');
    });

    Route::get('/journey/{name}', function ($name) {
        return Inertia::render('Journey/Show', [
            'practitioner' => [
                'name' => ucwords(str_replace('-', ' ', $name)),
                'tagline' => 'Awakening since 2023',
                'bio' => 'Walking the sacred path of Kundalini awakening through daily practice and journaling.',
                'daysActive' => 108,
                'totalEntries' => 143,
                'gratitudesReceived' => 89,
                'avatar' => '🪷',
            ],
        ]);
    });
});

// Public routes
Route::get('/golden-rules', function () {
    return Inertia::render('GoldenRules');
})->name('golden-rules');

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

Route::get('/community', function () {
    return Inertia::render('Community');
})->name('community');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/about/grand-master', function () {
    return Inertia::render('AboutGrandMaster');
})->name('about.grand-master');

Route::get('/about/core-team', function () {
    return Inertia::render('CoreTeam');
})->name('about.core-team');

Route::get('/meditation', function () {
    return Inertia::render('Meditation');
})->name('meditation');

Route::get('/knowledge', function () {
    return Inertia::render('Knowledge');
})->name('knowledge');

Route::get('/events', function () {
    return Inertia::render('Events');
})->name('events');

Route::get('/blog', function () {
    return Inertia::render('Blog');
})->name('blog');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/donate', function () {
    return Inertia::render('Donate');
})->name('donate');

Route::post('/contact', function (Request $request) {
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'phone' => 'nullable|string|max:30',
        'query' => 'required|string|max:2000',
    ]);

    // TODO: send notification email / store enquiry once mail/DB wiring is added.

    return redirect()->back()->with('success', 'Thank you. Your message has been received — we will reach out soon.');
})->name('contact.send');

Route::get('/journey/{name}', function ($name) {
    return Inertia::render('Journey/Show', [
        'practitioner' => [
            'name' => ucwords(str_replace('-', ' ', $name)),
            'tagline' => 'Awakening since 2023',
            'bio' => 'Walking the sacred path of Kundalini awakening through daily practice and journaling.',
            'daysActive' => 108,
            'totalEntries' => 143,
            'gratitudesReceived' => 89,
            'avatar' => '🪷',
        ],
    ]);
})->name('journey.show');

// Practitioner journal area — frontend-only "sacred code" access (no real backend
// auth yet, see writerSession.js). Not behind the `auth` middleware since there's
// no server-side session to check; each page guards itself client-side instead.
Route::get('/journal', function () {
    return Inertia::render('Journal/Enter');
})->name('journal.enter');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::get('/journal/create', function () {
    return Inertia::render('Journal/Create');
})->name('journal.create');

Route::get('/journal/entries', function () {
    return Inertia::render('Journal/Index');
})->name('journal.entries');

Route::get('/journal/profile', function () {
    return Inertia::render('Journal/Profile');
})->name('journal.profile');

// Admin routes (admin middleware checks is_admin flag)
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalPractitioners' => 12,
                'activeUsers' => 5,
                'entriesToday' => 8,
                'totalEntries' => 143,
            ],
            'recentPractitioners' => [
                ['id' => 1, 'name' => 'Maya Devi', 'code' => 'KD-2026-A72', 'status' => 'active'],
                ['id' => 2, 'name' => 'Arjun Patel', 'code' => 'KD-2026-B34', 'status' => 'active'],
                ['id' => 3, 'name' => 'Priya Sharma', 'code' => 'KD-2026-C91', 'status' => 'inactive'],
                ['id' => 4, 'name' => 'Ananda Krishnan', 'code' => 'KD-2026-D45', 'status' => 'active'],
            ],
            'recentEntries' => [
                ['id' => 1, 'title' => 'The First Spark', 'author' => 'Maya Devi', 'day' => 1, 'date' => '2026-03-15'],
                ['id' => 2, 'title' => 'Rooted in Being', 'author' => 'Maya Devi', 'day' => 7, 'date' => '2026-03-21'],
                ['id' => 3, 'title' => 'The Waters of Creativity', 'author' => 'Arjun Patel', 'day' => 21, 'date' => '2026-04-04'],
            ],
        ]);
    })->name('dashboard');

    Route::get('/practitioners', function () {
        return Inertia::render('Admin/Practitioners', [
            'practitioners' => [
                ['id' => 1, 'name' => 'Maya Devi', 'email' => 'maya@example.com', 'code' => 'KD-2026-A72', 'entries_count' => 45, 'status' => 'active', 'last_active' => '2 hours ago'],
                ['id' => 2, 'name' => 'Arjun Patel', 'email' => 'arjun@example.com', 'code' => 'KD-2026-B34', 'entries_count' => 32, 'status' => 'active', 'last_active' => '1 day ago'],
                ['id' => 3, 'name' => 'Priya Sharma', 'email' => 'priya@example.com', 'code' => 'KD-2026-C91', 'entries_count' => 18, 'status' => 'inactive', 'last_active' => '2 weeks ago'],
                ['id' => 4, 'name' => 'Ananda Krishnan', 'email' => 'ananda@example.com', 'code' => 'KD-2026-D45', 'entries_count' => 27, 'status' => 'active', 'last_active' => '5 hours ago'],
                ['id' => 5, 'name' => 'Devi Lakshmi', 'email' => null, 'code' => 'KD-2026-E78', 'entries_count' => 5, 'status' => 'active', 'last_active' => '3 days ago'],
                ['id' => 6, 'name' => 'Shiva Nataraj', 'email' => 'shiva@example.com', 'code' => 'KD-2026-F12', 'entries_count' => 16, 'status' => 'inactive', 'last_active' => '1 month ago'],
            ],
        ]);
    })->name('practitioners');

    Route::get('/practitioners/create', function () {
        return Inertia::render('Admin/CreatePractitioner');
    })->name('practitioners.create');

    Route::post('/practitioners', function () {
        // Store practitioner logic
        return redirect()->route('admin.practitioners')->with('success', 'Practitioner created!');
    })->name('practitioners.store');

    Route::get('/broadcast', function () {
        return Inertia::render('Admin/BroadcastNotice');
    })->name('broadcast');

    Route::post('/broadcast', function () {
        // Broadcast logic
        return redirect()->back()->with('success', 'Notice broadcast!');
    })->name('broadcast.send');

    Route::get('/testimonials', function () {
        return Inertia::render('Admin/Testimonials', [
            'testimonials' => [],
            'availableEntries' => [],
        ]);
    })->name('testimonials');

    Route::get('/quotes', function () {
        return Inertia::render('Admin/Quotes');
    })->name('quotes');

    Route::get('/donation', function () {
        return Inertia::render('Admin/Donation');
    })->name('donation');

    Route::get('/about-content', function () {
        return Inertia::render('Admin/AboutContent');
    })->name('about-content');

    Route::get('/qr-codes', function () {
        return Inertia::render('Admin/QrCodes');
    })->name('qr-codes');

    Route::get('/events', function () {
        return Inertia::render('Admin/Events');
    })->name('events');

    Route::get('/meditations', function () {
        return Inertia::render('Admin/Meditations');
    })->name('meditations');

    Route::get('/knowledge', function () {
        return Inertia::render('Admin/Knowledge');
    })->name('knowledge');
});

// Profile routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
