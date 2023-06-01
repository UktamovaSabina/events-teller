
const PORT = process.env.PORT || 5000

process.DEFAULT = {}
process.DEFAULT.pagination = {}
process.DEFAULT.pagination.limit = 10
process.DEFAULT.pagination.page = 1

export { PORT };