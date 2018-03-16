//
//  ViewController.swift
//  Simple Chinese
//
//  Created by Luming Wang on 7/10/17.
//  Copyright © 2017 Luming Wang. All rights reserved.
//

import UIKit
class ViewController: UIViewController {
    
    @IBAction func BeginStudy(_ sender: Any)
    {
        if(UserDefaults.standard.bool(forKey: "NavToQuiz"))
        {
            performSegue(withIdentifier: "NavToQuiz", sender: self)
        }
        else if(UserDefaults.standard.bool(forKey: "NavToStudy"))
        {
            performSegue(withIdentifier: ("NavToStudy"), sender: self)
        }
        else
        {
            performSegue(withIdentifier: "NavToNps", sender: self)
        }
    }


    @IBAction func ResetUserDefault(_ sender: Any)
    {
        let alert = UIAlertController(title: "Reseting will cause the system to lose all your progress", message: "Are you sure you still want to reset?", preferredStyle: UIAlertControllerStyle.alert)
        alert.addAction(UIAlertAction(title: "Yes", style: .default, handler: reset))
        alert.addAction(UIAlertAction(title: "No", style: .default, handler: nil))
        self.present(alert, animated: true, completion: nil)
        
        
    }
    func reset(alertAction: UIAlertAction) {
        for key in Array(UserDefaults.standard.dictionaryRepresentation().keys)
        {
            UserDefaults.standard.removeObject(forKey: key)
        }
    }


    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view, typically from a nib.
    }
}

