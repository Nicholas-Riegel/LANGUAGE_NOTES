// C++ File Handling Summary
// Based on: https://www.w3schools.com/cpp/cpp_files.asp
//
// The <fstream> library lets you create, write, and read files in C++.
//
// Classes:
//   ofstream - create and write to files
//   ifstream - read from files
//   fstream  - create, read, and write to files

#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
	// =====================
	// Create and Write to a File
	// =====================
	ofstream MyFile("example.txt"); // Create and open a text file
	MyFile << "Files can be tricky, but it is fun enough!" << endl; // Write to the file
	MyFile.close(); // Always close the file when done

	// =====================
	// Read from a File
	// =====================
	string myText;
	fstream MyReadFile("example.txt"); // Open the file for reading
	cout << "Reading from file: " << endl;
	while (getline(MyReadFile, myText)) {
		cout << myText << endl; // Output each line from the file
	}
	MyReadFile.close(); // Always close the file when done

	// =====================
	// Using fstream for both reading and writing
	// =====================
	fstream MyFile2;
	MyFile2.open("example2.txt", ios::out); // Open for writing
	if (MyFile2.is_open()) {
		MyFile2 << "This is written using fstream!" << endl;
		MyFile2.close();
	}
	MyFile2.open("example2.txt", ios::in); // Open for reading
    string myText2;
	if (MyFile2.is_open()) {
		while (getline(MyFile2, myText2)) {
			cout << myText2 << endl;
		}
		MyFile2.close();
	}

	return 0;
}

// Best Practices:
// - Always close your files after use to free resources.
// - Check if the file opened successfully (use is_open()).
// - Use getline() to read files line by line.
//
// For more, see the full <fstream> reference on W3Schools.
