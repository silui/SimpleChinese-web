//
//  ViewControllerStudy.swift
//  Simple Chinese
//
//  Created by Yibo Fu on 7/11/17.
//  Copyright © 2017 Luming Wang. All rights reserved.
//

import UIKit
import Firebase

class ViewControllerStudy: UIViewController {

    @IBOutlet weak var PinyinField: UILabel!
    @IBOutlet weak var DefField: UILabel!
    @IBOutlet weak var CharField: UILabel!
    @IBOutlet weak var QuizButton: UIButton!
    var myStrings : [Vacab]=[]
    var level:String!
    @IBOutlet weak var NextBut: UIButton!
    
    @IBOutlet weak var PrevBut: UIButton!
    
    @IBAction func QuizButtonPressed(_ sender: Any)
    {
        UserDefaults.standard.set(true, forKey: "NavToQuiz")
        UserDefaults.standard.set(false, forKey: "NavToStudy")
    }
    @IBAction func PrevVocab(_ sender: Any)
    {
        let lowerbound=UserDefaults.standard.integer(forKey: "LowerBound")
        let current=UserDefaults.standard.integer(forKey: "ArrayProgress")
        if(current==lowerbound)
        {
            print("ERROR: Class: ViewControllerStudy, func:PrevVocab, cond: current=lowerbound\nComment: prevbutton should already be hidden when lowerbound=current")
            
        }
        UserDefaults.standard.set(current-3, forKey: "ArrayProgress")
        DisplayNewSet()
        checkbutton()
    }

    @IBAction func NextVocab(_ sender: Any)
    {
        let target=UserDefaults.standard.integer(forKey: "TargetProgress")
        let current=UserDefaults.standard.integer(forKey: "ArrayProgress")
        if(target==current)
        {
            print("ERROR: Class: ViewControllerStudy, func:NextVocab, cond: target=current\nComment: nextbutton should already be hidden when target=current")
        }
        UserDefaults.standard.set(current+3, forKey: "ArrayProgress")
        DisplayNewSet()
        checkbutton()

    }
    
    func DisplayNewSet()
    {
        let arraywalker=UserDefaults.standard.integer(forKey: "ArrayProgress")
        CharField.text=myStrings[arraywalker].hanzi
        
        if CharField.text!.characters.count > 1{
            CharField.font = UIFont(name: "QXyingbikai", size: 100)
        }else{
             CharField.font = UIFont(name: "QXyingbikai", size: 180)
        }
        PinyinField.text=myStrings[arraywalker].pinyin
        let def = myStrings[arraywalker].translation.reduce("", {"\($0 as! String);\($1 as! String)"})
        DefField.text = def.substring(from: def.index(after: def.startIndex))
        
    }
    func checkbutton()
    {
        let lower=UserDefaults.standard.integer(forKey: "LowerBound")
        let current=UserDefaults.standard.integer(forKey: "ArrayProgress")
        let upper=UserDefaults.standard.integer(forKey: "TargetProgress")
        if(current==lower){
            PrevBut.isHidden=true
        }
        else{
            PrevBut.isHidden=false
        }
        if(current==upper){
            NextBut.isHidden=true
            UserDefaults.standard.set(true, forKey: "QuizButtonShowed")
        }
        else{
            NextBut.isHidden=false
        }
        let QuizButtonShowed : Bool = UserDefaults.standard.bool(forKey: "QuizButtonShowed")
        QuizButton.isHidden = !QuizButtonShowed
    }
    
    func readData(level:String){
        ref.child("vocab").child(level).observeSingleEvent(of: .value, with: { (snapshot) in
            // Get user value
            let array = snapshot.value as! NSDictionary
            let keys = Array(array.allKeys).sorted(by: { (key1, key2) -> Bool in
                return (key1 as! NSString).intValue < (key2 as! NSString).intValue
            })
            for key in keys{
                if let w = array[key] as? [String:Any]{
                    self.myStrings.append(Vacab(hanzi: w["hanzi"] as! String, pinyin: w["pinyin"] as! String,translation: w["translations"] as! NSArray))
                }
            }
            print(self.myStrings)
            let Stringsupper : Int = self.myStrings.count-2
            //        LoadVocab.PutInArrayDefault(ArrayRef: &myStrings)
            let vps=UserDefaults.standard.integer(forKey: "vps")
            UserDefaults.standard.set(min(Stringsupper, vps*3-3), forKey: "TargetProgress")
            var target=UserDefaults.standard.integer(forKey: "TargetProgress")
            let NeedNewSet=UserDefaults.standard.bool(forKey: "NeedNewSet") //meaning done need anther set of vocab with vps or less than vps amount
            if(NeedNewSet)
            {
                let ideaupperbound=target+vps*3
                target+=3
                UserDefaults.standard.set(target, forKey: "LowerBound")
                UserDefaults.standard.set(target, forKey: "ArrayProgress")
                let stingupperbound=self.myStrings.count-4
                print(self.myStrings.count)
                UserDefaults.standard.set(min(ideaupperbound, stingupperbound), forKey: "TargetProgress")
                UserDefaults.standard.set(false, forKey: "NeedNewSet")
                UserDefaults.standard.set(false, forKey: "QuizButtonShowed")
            }
            self.DisplayNewSet()
            self.checkbutton()
        }) { (error) in
            print(error.localizedDescription)
        }
    }
    
    var ref: DatabaseReference!

    override func viewDidLoad()
    {
        super.viewDidLoad()
        DefField.numberOfLines = 0
        ref = Database.database().reference()
        print(UserDefaults.standard.string(forKey: "VocabSet"))
        if UserDefaults.standard.string(forKey: "VocabSet") != nil{
            self.level = UserDefaults.standard.string(forKey: "VocabSet")
        }
        readData(level: self.level)
        
        
        
    }
    
}

struct Vacab {
    var hanzi:String!
    var pinyin:String!
    var translation:NSArray!
}
