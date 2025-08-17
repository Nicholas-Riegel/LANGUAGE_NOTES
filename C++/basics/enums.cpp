#include <iostream>
#include <string>

using namespace std;

// Basic enum declaration
enum Color {
    RED,
    GREEN,
    BLUE
};

// Enum with custom values
enum Status {
    PENDING = 1,
    APPROVED = 2,
    REJECTED = 3
};

// Enum class (scoped enum) - C++11 and later
enum class Priority {
    LOW,
    MEDIUM,
    HIGH
};

// Enum class with specific type and values
enum class Grade : char {
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D',
    F = 'F'
};

int main() {
    
    cout << "===== BASIC ENUMS =====\n";
    
    // Using basic enum
    Color myColor = RED;
    cout << "Color value: " << myColor << endl;  // Prints 0 (first value)
    
    // Enum values are automatically numbered starting from 0
    cout << "RED = " << RED << endl;      // 0
    cout << "GREEN = " << GREEN << endl;  // 1
    cout << "BLUE = " << BLUE << endl;    // 2
    
    cout << "\n===== ENUMS WITH CUSTOM VALUES =====\n";
    
    Status orderStatus = APPROVED;
    cout << "Status value: " << orderStatus << endl;  // Prints 2
    
    cout << "PENDING = " << PENDING << endl;   // 1
    cout << "APPROVED = " << APPROVED << endl; // 2
    cout << "REJECTED = " << REJECTED << endl; // 3
    
    cout << "\n===== USING ENUMS IN CONDITIONS =====\n";
    
    Color trafficLight = GREEN;
    
    if (trafficLight == RED) {
        cout << "Stop!" << endl;
    } else if (trafficLight == GREEN) {
        cout << "Go!" << endl;
    } else if (trafficLight == BLUE) {
        cout << "Invalid traffic light color!" << endl;
    }
    
    cout << "\n===== SWITCH STATEMENT WITH ENUMS =====\n";
    
    Status currentStatus = PENDING;
    
    switch (currentStatus) {
        case PENDING:
            cout << "Order is pending..." << endl;
            break;
        case APPROVED:
            cout << "Order approved!" << endl;
            break;
        case REJECTED:
            cout << "Order rejected." << endl;
            break;
        default:
            cout << "Unknown status" << endl;
    }
    
    cout << "\n===== ENUM CLASS (SCOPED ENUMS) =====\n";
    
    // Enum class requires scope resolution
    Priority taskPriority = Priority::HIGH;
    
    // SCOPED ENUMS EXPLAINED:
    // 1. Must use scope resolution (Priority::HIGH, not just HIGH)
    // 2. Cannot be implicitly converted to integers
    // 3. Don't pollute the surrounding namespace
    // 4. Provide better type safety
    
    cout << "Why enum class is better:" << endl;
    cout << "- Must use Priority::HIGH (prevents naming conflicts)" << endl;
    cout << "- Cannot accidentally compare with integers" << endl;
    cout << "- Values don't leak into global scope" << endl;
    
    // Cannot directly print enum class values (they don't auto-convert to int)
    // cout << taskPriority << endl;  // This would cause an error
    
    cout << "Task priority: ";
    switch (taskPriority) {
        case Priority::LOW:
            cout << "Low priority" << endl;
            break;
        case Priority::MEDIUM:
            cout << "Medium priority" << endl;
            break;
        case Priority::HIGH:
            cout << "High priority" << endl;
            break;
    }
    
    // To get the underlying integer value, you must explicitly cast
    cout << "Priority as integer: " << static_cast<int>(taskPriority) << endl;
    
    cout << "\n===== SCOPED vs UNSCOPED COMPARISON =====\n";
    
    // UNSCOPED (basic enum) problems:
    Color myColor = RED;  // RED is available in global scope
    int redValue = RED;   // Can accidentally assign to int
    cout << "Unscoped enum problems:" << endl;
    cout << "- RED is global (can conflict with other RED definitions)" << endl;
    cout << "- Can assign to int: " << redValue << endl;
    
    // SCOPED (enum class) benefits:
    Priority myPriority = Priority::HIGH;  // Must use scope
    // int highValue = Priority::HIGH;     // This would cause error - good!
    // Priority wrongPriority = HIGH;      // This would cause error - good!
    
    cout << "Scoped enum benefits:" << endl;
    cout << "- Must use Priority::HIGH (no naming conflicts)" << endl;
    cout << "- Cannot accidentally assign to int" << endl;
    cout << "- Cannot use wrong scope" << endl;
    
    cout << "\n===== ENUM CLASS WITH CHAR VALUES =====\n";
    
    Grade studentGrade = Grade::A;
    
    cout << "Student grade: ";
    switch (studentGrade) {
        case Grade::A:
            cout << "Excellent (A)" << endl;
            break;
        case Grade::B:
            cout << "Good (B)" << endl;
            break;
        case Grade::C:
            cout << "Average (C)" << endl;
            break;
        case Grade::D:
            cout << "Below Average (D)" << endl;
            break;
        case Grade::F:
            cout << "Fail (F)" << endl;
            break;
    }
    
    // Cast enum class to its underlying type
    cout << "Grade as char: " << static_cast<char>(studentGrade) << endl;
    
    cout << "\n===== COMPARING ENUM TYPES =====\n";
    
    cout << "UNSCOPED ENUM (basic enum) - Less Safe:" << endl;
    
    // Basic enum can be compared with integers (dangerous!)
    Color color1 = RED;
    if (color1 == 0) {  // This works but is dangerous
        cout << "✗ Color equals 0 - this shouldn't be allowed!" << endl;
    }
    
    // Basic enum values pollute the namespace
    // If another enum also has RED, there would be a conflict
    cout << "✗ RED is accessible globally (namespace pollution)" << endl;
    
    cout << "\nSCOPED ENUM (enum class) - Safer:" << endl;
    
    // Enum class cannot be compared with integers (much safer!)
    Priority priority1 = Priority::LOW;
    // if (priority1 == 0) {  // ✓ This causes compilation error - good!
    //     cout << "This won't compile - good safety!" << endl;
    // }
    cout << "✓ Cannot compare with integers (prevents bugs)" << endl;
    
    // Must use explicit casting if you really need the integer value
    if (static_cast<int>(priority1) == 0) {
        cout << "✓ Explicit cast required - shows intent clearly" << endl;
    }
    
    cout << "✓ Values are scoped (no namespace pollution)" << endl;
    
    cout << "\n===== REAL-WORLD EXAMPLE =====\n";
    
    // Imagine two different enums with similar values
    enum TrafficLight { RED_LIGHT, YELLOW_LIGHT, GREEN_LIGHT };
    // enum ErrorCode { RED_ERROR, YELLOW_WARNING, GREEN_SUCCESS };  // Would conflict with Color::RED!
    
    enum class NetworkStatus { CONNECTED, DISCONNECTED, ERROR };
    enum class DatabaseStatus { CONNECTED, DISCONNECTED, ERROR };  // No conflict!
    
    NetworkStatus netStatus = NetworkStatus::CONNECTED;
    DatabaseStatus dbStatus = DatabaseStatus::CONNECTED;
    
    cout << "Network and Database can both have CONNECTED without conflict!" << endl;
    cout << "This is only possible with scoped enums (enum class)" << endl;
    
    cout << "\n===== FUNCTION WITH ENUM PARAMETER =====\n";
    
    auto printColor = [](Color c) {
        switch (c) {
            case RED:
                cout << "Red color" << endl;
                break;
            case GREEN:
                cout << "Green color" << endl;
                break;
            case BLUE:
                cout << "Blue color" << endl;
                break;
        }
    };
    
    printColor(BLUE);
    
    cout << "\n===== ENUM ADVANTAGES =====\n";
    cout << "1. Type safety - prevents invalid values" << endl;
    cout << "2. Readable code - names instead of magic numbers" << endl;
    cout << "3. Easy maintenance - change values in one place" << endl;
    cout << "4. Enum class provides better scoping and type safety" << endl;
    
    return 0;
}
