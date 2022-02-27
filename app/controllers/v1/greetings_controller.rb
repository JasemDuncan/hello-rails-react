class V1::GreetingsController < ApplicationController
  # rubocop:disable Style/HashSyntax
  def index
    render json: { :greetings => [
      {
        :greeting => Message.order(Arel.sql('RANDOM()')).first.greeting
      }
    ] }.to_json
  end
  # rubocop:enable Style/HashSyntax
end
