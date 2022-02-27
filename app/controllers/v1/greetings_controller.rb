class V1::GreetingsController < ApplicationController
    def index
        render json: { :greetings => [
            {
                :greeting => Message.order(Arel.sql('RANDOM()')).first.id
            }
        ]}.to_json
        
        
    end
end