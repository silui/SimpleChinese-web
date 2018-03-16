//
//  ViewControllerConclusion.swift
//  Simple Chinese
//
//  Created by Luming Wang on 7/16/17.
//  Copyright © 2017 Luming Wang. All rights reserved.
//

import UIKit

class ViewControllerConclusion: UIViewController, UITableViewDelegate, UITableViewDataSource
{
    
    
    var passChar : [String] = []
    var passTorF : [Bool] = []
    @IBOutlet weak var correctRate: UILabel!
    
    
    public func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int
    {
        return (passChar.count)
    }
    
    public func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell
    {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell")
            as! ConclusionCell
        if(passTorF[indexPath.row] == true)
        {
            cell.TorF.text="⭕️"
        }
        else
        {
            cell.TorF.text="❌"
        }
        cell.Character.text=passChar[indexPath.row]
        
        return(cell)
    }
    
    func calculateCorrectRate(){
        var numOfCorrect = 0
        //var correctRateCalcuate : Double = 0
        for i in 0...passTorF.count-1
        {
            if(passTorF[i] == true)
            {
                numOfCorrect += 1
            }
        }
        correctRate.text = "You got " + String(numOfCorrect) + "/" + String(passTorF.count) + " correct"
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        calculateCorrectRate()
        // Do any additional setup after loading the view.
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
        
        
        
    }}
