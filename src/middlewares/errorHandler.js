export  default (err, req, res, next) => {
    if (err.status != 500) {
      return res.status(400).json({ status: 400, message: err.message })
    }
    res.status(500).json({
      status: 500,
      message: err.message
    })
  };