crypto = require('crypto')

# Wrapper class for errors provided by {Amanda} json schema validator
# @author Peter Grilli <tully@apiary.io>
class ValidationErrors
  # Construct a ValidationErrors
  constructor: (amandaErrors) ->
    @length = amandaErrors?.length || 0
    @amandaErrors = amandaErrors || {}
    @now = Date.now().toString()
    #TO DO need to be solved
    @dataError = null
    if @length > 0
      for i in [0..@length - 1]
        @[i] = @amandaErrors[i]

  #returns errors from given path if any or empty array
  #@param [Array] pathArray every element is key in source object
  #@return [Array] errors from given path if any or empty array
  getByPath: (pathArray) ->
    if not @hashTable then @buildHashtable()
    @hashTable[@getKeyFromPath(pathArray)] || []

  get: () ->
    return @amandaErrors

  toHtml:() ->
    return '<b></b>'

  #@private
  buildHashtable: () ->
    @hashTable = {}

    if @length < 1
      return

    for i in [0..@length - 1]
      key = @getKeyFromPath(@amandaErrors[i]['property'])

      if not @hashTable[key]
        @hashTable[key] = []

      @hashTable[key].push @amandaErrors[i]

  #@private
  getKeyFromPath: (path) ->
    crypto.createHash('md5').update(path.join(@now)).digest('hex')
#
## Base wrapper class for errors
##ancessors should implement setErrors method which should set @errors variable to minimal propper format:
##      [
##         {
##           message: '',
##           data: {}
##         }
##      ]
## [] presents no errors
## @author Peter Grilli <tully@apiary.io>
#class ValidationErrors
#  # Construct a ValidationErrors
#  # data or errors
#  #@option {} [Object] data1 source data
#  #@option {} [Object] data2 source data
#  #@option {} [Array<Object>] errors computed errors
#  constructor: ({@data1, @data2, errors}) ->
#    @setErrors(errors)
#
#  get: (options = {}) ->
#    @errors
#
#  #@protected
#  setErrors: (errors) ->
#    @errors = errors
#
#
#
#
#class TextValidationErrors extends ValidationErrors
#  get: () ->
#
#class JsonValidationErrors extends ValidationErrors
#  get: () ->
#
#class WrongValidationErrors extends ValidationErrors
#  get: () ->
#
#
module.exports = {
  ValidationErrors
}
