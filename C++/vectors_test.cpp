#include <iostream>
#include <vector>

using namespace std;

int main(){

    // create a vector
    vector<string> vect;

    // add to end
    vect.push_back("b");
    vect.push_back("d");

    // add to beginning
    vect.insert(vect.begin(), "a");
    
    // insert at index
    vect.insert(vect.begin() + 2, "c");
    vect.insert(vect.begin() + 2, "c");
    
    // remove from end
    // vect.pop_back();
    
    // remove from beginning
    // string removed = vect[0];
    // vect.erase(vect.begin());
    
    // remove at index
    // string removed = vect[2];
    // vect.erase(vect.begin() + 2);
    
    // remove by value
    auto it = find(vect.begin(), vect.end(), "c");
    if (it != vect.end()) {
        vect.erase(it);
    }

    // Remove all occurrences
    // while (true) {
    //     auto it = find(vect.begin(), vect.end(), "c");
    //     if (it != vect.end()) {
    //         vect.erase(it);
    //     } else {
    //         break;  // No more "c" found
    //     }
    // }

    // access by index
    // cout << vect[2] << endl;

    // modify at index
    vect[2] = "C";
    
    // copy subset
 
    // for (const auto& e : vect) { // faster; only creates a reference
    for (string e : vect) { // slower; creates a copy
        cout << e << " ";
    }

    cout << endl;

    return 0;
}