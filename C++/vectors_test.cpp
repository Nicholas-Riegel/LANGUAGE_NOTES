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
    
    // remove from end
    // vect.pop_back();
    
    // remove from beginning
    // string removed = vect[0];
    // vect.erase(vect.begin());
    
    // remove at index
    // string removed = vect[2];
    // vect.erase(vect.begin() + 2);
    
    // remove by name
    
    // access by index
    
    // modify at index
    
    // copy subset
 
    // for (string e : vect) { // slower; creates a copy
    for (const auto& e : vect) { // faster; only creates a reference
        cout << e << " ";
    }

    cout << endl;

    return 0;
}