/*  
* 静态方法static，不需要new，减少内存
*/


import stuModel from '../models/stu';

class StuController {
  
  /**
   * 查询list
   */
  static async list( ctx, next ){
    const list = await stuModel.find();
    ctx.success(list);
  }
  
  /**
   * 
   * @param {Object} stu
   */
  static async add( ctx, next ){
    let stu = new stuModel(ctx.request.body);
    try {
      stu = await stu.save();
    } catch(err){
      ctx.error(err, "添加失败！");
    }
    ctx.success(null, '添加成功！');
  }

  static async edit( ctx, next ){
    const { _id, name, tel, address } = ctx.request.body;
    let stu = await stuModel.findById(_id);
    stu.name = name;
    stu.tel = tel;
    stu.address = address;
    try {
      stu = await stu.save();
    } catch(err){
      ctx.error(err, " 编辑失败！");
    }
    ctx.success(null, '编辑成功！');
  }

  /**
   * 删除
   * @param {Object} user
   */
  static async delete(ctx){
    const { id } = ctx.params;
    await stuModel.remove({_id: id},(err) => {
      if(err) return ctx.error(err,'删除失败！');
    });
    return ctx.success(null,'删除成功！');
  }
}

export default StuController;