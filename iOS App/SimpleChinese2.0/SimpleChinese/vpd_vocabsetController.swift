//
//  vpd_vocabsetController.swift
//  Simple Chinese
//
//  Created by Tian Qiu on 7/14/17.
//  Copyright © 2017 Luming Wang. All rights reserved.
//

import UIKit

class vpd_vocabsetController: UIViewController, UIPickerViewDataSource, UIPickerViewDelegate{

    @IBOutlet weak var pickerLevelView: UIPickerView!
    //    let VocabSet=LoadVocab.VocabSet
    let VocabSet=["level1","level2","level3","level4","level5"]
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        return VocabSet[row]
    }
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return VocabSet.count
    }
    
    @IBOutlet weak var vps_display: UILabel!
    @IBOutlet weak var vps_slider: UISlider!
    var vps=25
    
    @IBAction func vps_slider_slide(_ sender: Any){
        vps = Int(vps_slider.value)
        vps_display.text="\(vps) words per session"
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {

        UserDefaults.standard.set(true, forKey: "NavToStudy")
        UserDefaults.standard.set(false, forKey: "NavToQuiz")
        UserDefaults.standard.set(vps, forKey: "vps")
        UserDefaults.standard.set(0, forKey: "ArrayProgress")
        UserDefaults.standard.set(0, forKey: "LowerBound")
        UserDefaults.standard.set(VocabSet[pickerLevelView.selectedRow(inComponent: 0)], forKey: "VocabSet")
//        var myStrings : [String]=[]
//        LoadVocab.PutInArrayCustom(ArrayRef: &myStrings, set: UserDefaults.standard.integer(forKey: "VocabSet"))
        
        
        let controller = segue.destination as! ViewControllerStudy
        controller.level = VocabSet[pickerLevelView.selectedRow(inComponent: 0)]
}
    

    override func viewDidLoad() {
        super.viewDidLoad()
//        UserDefaults.standard.set(1, forKey: "VocabSet")      //in case user didn't roll the
    }

}
