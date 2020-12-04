require "pry"
require "aws-sdk-lambda"
require "json"

class BaseLambdaService
  attr_accessor :response

  def invoke!
    config!
    invocation = client.invoke(invoke_params)

    hash = invocation.to_h

    hash.merge({
      foo: 'bar',
      payload: JSON.parse(hash[:payload].read)
    })
  end

  def invoke_params
    {
      function_name: 'serverless-quickstart-dev-greet',
      invocation_type: 'RequestResponse',
      payload: JSON.dump({ name: 'Josh' })
    }
  end

  def client
    @client ||= Aws::Lambda::Client.new({})
  end

  def config!
    Aws.config.update({
      profile: ENV['AWS_PROFILE'],
      region: 'us-east-1'
    })
  end
end

service = BaseLambdaService.new

pp service.invoke!

# pry
