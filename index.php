<?php


// file upload system object oriented?

// laravel 9 image upload system handling?

class FileUploader {
    private $target_dir;
    private $max_file_size;
    private $allowed_file_types;

    public function __construct($target_dir, $max_file_size, $allowed_file_types) {
        $this->target_dir = $target_dir;
        $this->max_file_size = $max_file_size;
        $this->allowed_file_types = $allowed_file_types;
    }

    public function uploadFile($file) {
        // Check if the file is empty
        if (empty($file)) {
            throw new Exception("File is empty");
        }

        // Check if the file size is too large
        if ($file["size"] > $this->max_file_size) {
            throw new Exception("File size is too large");
        }

        // Check if the file type is allowed
        $file_type = pathinfo($file["name"], PATHINFO_EXTENSION);
        if (!in_array($file_type, $this->allowed_file_types)) {
            throw new Exception("File type is not allowed");
        }

        // Create a unique file name
        $file_name = uniqid() . "." . $file_type;

        // Move the file to the target directory
        if (!move_uploaded_file($file["tmp_name"], $this->target_dir . $file_name)) {
            throw new Exception("File could not be uploaded");
        }

        // Return the file name
        return $file_name;
    }
}


public function store(Request $request)
{
    $request->validate([
        'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $image = $request->file('image');

    $name = time().'.'.$image->getClientOriginalExtension();

    $path = $image->storeAs('public/images', $name);

    $image = Image::create([
        'name' => $name,
        'path' => $path,
        'size' => $image->getSize(),
        'mime_type' => $image->getMimeType(),
    ]);

    return response()->json([
        'success' => true,
        'image' => $image,
    ]);
}

public function show($id)
{
    $image = Image::findOrFail($id);

    return response()->json([
        'success' => true,
        'image' => $image,
    ]);
}

public function destroy($id)
{
    $image = Image::findOrFail($id);

    $image->delete();

    return response
}
}