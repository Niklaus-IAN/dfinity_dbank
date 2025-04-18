// actor {
//   public query func greet(name : Text) : async Text {
//     return "Hello, " # name # "!";
//   };
// };

import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
  stable var currentValue: Float = 300;
  currentValue := 300;
  Debug.print(debug_show(currentValue));

  let _id = 2345782475937439;

  type time = Int;
  var _nanoSec = Time.now(); 

  stable var _startTime = _nanoSec;
  _startTime := Time.now();
  Debug.print(debug_show(_startTime));

  public query func now() : async time {
    Debug.print(debug_show(_nanoSec));
    return _nanoSec;
  };

  public func topUp(_amount: Float){
    currentValue += _amount;
    Debug.print(debug_show(currentValue));
  };

  // public func withdraw(_amount: Nat) : async Text{
  //   if (_amount > currentValue){
  //     insufficientFunds();
  //   };
  //   Debug.print(debug_show(_amount));
  //   currentValue -= _amount;
  //   Debug.print(debug_show(currentValue));
  // };

  public func withdraw(_amount: Float) : async Text {
    if (_amount > currentValue) {
      return "Insufficient funds.";
    };

    currentValue -= _amount;
    Debug.print("Withdrawn: " # debug_show(_amount));
    Debug.print("Current balance: " # debug_show(currentValue));

    return "Withdrawal successful.";
  };


  public func withdrawal(_amount: Float) {
    let tempValue: Float = currentValue - _amount;
    Debug.print(debug_show(tempValue));
    if (tempValue >= 0) {
      currentValue -= _amount;
      Debug.print(debug_show(currentValue));
    } else {
      Debug.print("Insufficient balance");
    }

    // currentValue -= _amount;
    // Debug.print("Withdrawn: " # debug_show(_amount));
    // Debug.print("Current balance: " # debug_show(currentValue));

    // return "Withdrawal successful.";
  };


  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };


  // Query Function and Update Function

  public query func checkBalance() : async Float {
    Debug.print("The current value is: "#debug_show(currentValue));
    return currentValue;
  };

  // topUp()


  // Orthogonal Persistence (Holding on to state)
  // Add Stable to the var head

  // Compounding Interest


  var timeSec : Int = 0;

  public func compound() : async time {
    timeSec := _nanoSec / 1_000_000_000; // Convert to seconds
    Debug.print("Seconds since epoch: " # debug_show(timeSec));
    return timeSec;
  };

  public func compounding() : async Float {
    // Debug.print("Running");
    let _currentTime = Time.now();
    let _timeElapsedNS = _currentTime - _startTime;
    let _timeElapsedS = _timeElapsedNS / 1000000000;
    currentValue := currentValue * (1.01 ** Float.fromInt(_timeElapsedS));
    _startTime := _currentTime;
    // Debug.print(debug_show(currentValue));
    return currentValue;
  }
  
}