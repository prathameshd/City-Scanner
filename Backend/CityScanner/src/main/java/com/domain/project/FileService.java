package com.domain.project;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileService {

	@Value("C:\\Users\\Hp\\Desktop\\OOSD\\project\\City-Source\\City-Scanner-UI\\project\\public\\EventImages")
	public String uploadDir;

	public void uploadFile(MultipartFile file) {

		try {
			Path copyLocation = Paths
					.get(uploadDir + File.separator + StringUtils.cleanPath(file.getOriginalFilename()));
			Files.copy(file.getInputStream(), copyLocation, StandardCopyOption.REPLACE_EXISTING);
		} catch (Exception e) {
			e.printStackTrace();
			try {
				throw new FileStorageException(
						"Could not store file " + file.getOriginalFilename() + ". Please try again!");
			} catch (FileStorageException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}
	}
}
