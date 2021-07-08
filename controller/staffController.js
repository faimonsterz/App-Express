const Staff = require('../models/staff');

exports.index = async (req, res, next) => {
    
    const staff = await Staff.find().sort({_id: -1}); // sort by id max to min
    
    res.status(200).json({
      data: staff
    })
  }

exports.show = async (req, res, next) => {
    try {
        const {id} = req.params;
         //const staff = await Staff.findOne({_id: id}); // find by id 
        const staff = await Staff.findById(id);
        
        if(!staff){
            throw new Error('not have Data of staff');
        }else{
            res.status(200).json({
            data: staff
          })
        }
        
    } catch (error) {
        res.status(400).json({
            error: {
                message: 'cannot insert' + error.message
            }
        });
    }
  }

exports.insert = async (req, res, next) => {
    
    const {name,salary} = req.body
    //let staff = new Staff(req.body); //insert all
    let staff = new Staff({ // insert not all can select insert data
        name: name,
        salary: salary
    })
    await staff.save();

    res.status(201).json({
      message: 'Done to insert'
    })
  }

exports.destroy = async (req, res, next) => {
    try {
        const {id} = req.params;
        
        const staff = await Staff.deleteOne({_id:id});
        
        if(staff.deletedCount == 0){
            throw new Error('cannot delete');
        }else{
            res.status(200).json({
            message: 'delete Done'
          })
        }
        
    } catch (error) {
        res.status(400).json({
            error: {
                message: 'Warring!!' + error.message
            }
        });
    }
  }

exports.update = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {name,salary} = req.body

        // const staff = await Staff.findById(id);
        // staff.name = name;
        // staff.salary = salary;
        // await staff.save();

        // const staff = await Staff.findByIdAndUpdate(id,{
        //     name: name,
        //     salary: salary
        // })

        const staff = await Staff.updateOne({_id:id}, {
             name: name,
             salary: salary
        });
        
        if(staff.nModified ===0){
            throw new Error('cannot update');
        }else{
            res.status(200).json({
            message: 'update Done'
          })
        }

        // res.status(200).json({
        //     message: 'Update Done'
        //   })
        
    } catch (error) {
        res.status(400).json({
            error: {
                message: 'Warring!!' + error.message
            }
        });
    }
  }