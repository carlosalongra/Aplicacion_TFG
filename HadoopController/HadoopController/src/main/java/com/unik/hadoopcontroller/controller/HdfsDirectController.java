package com.unik.hadoopcontroller.controller;

import com.unik.hadoopcontroller.service.HdfsDirectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import com.unik.hadoopcontroller.model.UploadResponse;

@RequestMapping("/files")
@CrossOrigin(origins = "http://localhost:8081")
@RestController
public class HdfsDirectController {

    @Autowired
    private HdfsDirectService hdfsDirectService;

    @GetMapping("/read")
    public String readFile(@RequestParam String path) {
        try {
            return hdfsDirectService.readFromHdfs(path);
        } catch (IOException e) {
            return "Error reading from HDFS: " + e.getMessage();
        }
    }

    @PostMapping("/write")
    public String writeFile(@RequestParam String path, @RequestParam String content) {
        try {
            hdfsDirectService.writeToHdfs(path, content);
            return "Successfully written to HDFS.";
        } catch (IOException e) {
            return "Error writing to HDFS: " + e.getMessage();
        }
    }
    @PostMapping("/upload")
    public ResponseEntity<UploadResponse> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam String title,
            @RequestParam List<String> authors) {
        String originalFileName = file.getOriginalFilename();
        if (originalFileName == null) {
            return ResponseEntity.badRequest().body(new UploadResponse("Error: Could not determine original file name."));
        }
        try {
            hdfsDirectService.writeToHdfsUnique(originalFileName, file, title, authors);
            return ResponseEntity.ok(new UploadResponse("Successfully written to HDFS."));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new UploadResponse("Error uploading to HDFS: " + e.getMessage()));
        }
    }


    @PostMapping("/append")
    public String appendToFile(@RequestParam String path, @RequestParam String content) {
        try {
            hdfsDirectService.appendToHdfs(path, content);
            return "Successfully appended to HDFS.";
        } catch (IOException e) {
            return "Error appending to HDFS: " + e.getMessage();
        }
    }


    @DeleteMapping("/delete")
    public String deleteFile(@RequestParam String path) {
        try {
            boolean deleted = hdfsDirectService.deleteFile(path);
            return deleted ? "File deleted successfully." : "File deletion failed.";
        } catch (IOException e) {
            return "Error deleting file from HDFS: " + e.getMessage();
        }
    }

    @GetMapping("/exists")
    public String fileExists(@RequestParam String path) {
        try {
            boolean exists = hdfsDirectService.fileExists(path);
            return exists ? "File exists." : "File does not exist.";
        } catch (IOException e) {
            return "Error checking file existence: " + e.getMessage();
        }
    }

    @GetMapping("/list")
    public List<String> listFiles(@RequestParam String directoryPath) {
        try {
            return hdfsDirectService.listFiles(directoryPath);
        } catch (IOException e) {
            return List.of("Error listing files in directory: " + e.getMessage());
        }
    }
    @GetMapping("/files/download/{fileName}")
    public ResponseEntity<Resource> downloadFileWithName(@PathVariable String fileName) {
        try {
            Resource file = hdfsDirectService.downloadFile(fileName);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                    .body(file);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to download file", e);
        }
    }

    @GetMapping("/files/download/")
    public ResponseEntity<Resource> downloadFileWithFilePath(@RequestParam String filePath) {
        try {
            Resource file = hdfsDirectService.downloadFileByPath(filePath);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filepath=\"" + filePath + "\"")
                    .body(file);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to download file", e);
        }
    }

}
