<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $notes = $user->notes()->latest()->get();
        
        // Log for debugging
        \Log::info('Notes fetched for user', [
            'user_id' => $user->id,
            'user_email' => $user->email,
            'notes_count' => $notes->count(),
            'note_ids' => $notes->pluck('id')->toArray()
        ]);
        
        return $notes;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'body' => ['nullable', 'string'],
        ]);

        // Ensure user_id is set to the authenticated user
        $data['user_id'] = $request->user()->id;
        
        $note = $request->user()->notes()->create($data);

        // Log for debugging
        \Log::info('Note created', [
            'user_id' => $request->user()->id,
            'note_id' => $note->id,
            'title' => $note->title
        ]);

        return response()->json($note, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Note $note)
    {
        $this->authorize($note);
        return $note;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Note $note)
    {
        $this->authorize($note);

        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'body' => ['nullable', 'string'],
        ]);

        $note->update($data);

        return $note;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        $this->authorize($note);
        $note->delete();

        return response()->json(['message' => 'Note Deleted']);
    }

    private function authorize(Note $note): void
    {
        abort_if($note->user_id !== auth()->id(), 403, 'Forbidden');
    }
}
