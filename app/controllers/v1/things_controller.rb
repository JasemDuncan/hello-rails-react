class V1::ThingsController < ApplicationController
    def index
        render json: { :things => [
            {
                :name => 'some-thing',
                :guid => '04151-2616-5156156'
            }            
        ] }.to_json
    end
end