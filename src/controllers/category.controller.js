import { read } from '../utils/model.js';

const GET_CATEGORY = (req, res) => {
  try {
    const categories = read('categories');
    const subCategories = read('subCategories');
    
    categories.map(category => {
        const result = []
        subCategories.map(subs => {
          if (subs.category_id == category.category_id) {
            delete subs.category_id
            result.push(subs)
          }
        })
  
        if (result.length > 0) {
          category.sub_categories = result
        }
      })

    res.status(200).json({
      status: 200,
      message: 'success',
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message
    })
  }
};

const GET_SUB_CATEGORY = (req, res) => {
  try {
    const categories = read('subCategories');

    res.status(200).json({
      status: 200,
      message: 'success',
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message
    })
  }
};

export default {
    GET_CATEGORY,
    GET_SUB_CATEGORY
};